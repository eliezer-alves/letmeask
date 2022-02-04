import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from '../services/firebase';

type User = {
	uid: string;
	name: string;
	avatar: string;
}

type AuthContextType = {
	user: User | undefined;
	signInWithGoogle: () => void;
}

type AuthContextProviderProps = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
	const [user, setUser] = useState<User>();

	const handleSetUser = (firebaseUser: any) => {
		const { displayName, photoURL, uid } = firebaseUser;

		if (!displayName || !photoURL) {
			throw new Error('Missing information from Google Account.');
		}

		setUser({
			uid: uid,
			name: displayName,
			avatar: photoURL
		});
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				handleSetUser(user)
			}
		})

		return () => {
			unsubscribe();
		}
	}, []);

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await auth.signInWithPopup(provider)

		if (result.user) {
			handleSetUser(result.user)
		}
	}

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	);
}
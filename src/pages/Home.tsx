import '../styles/auth.scss';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';



export function Home() {
	const navigate = useNavigate();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState('');

	async function handleCreateRoom() {
		if (!user) {
			signInWithGoogle();
		}

		navigate('/rooms/new')
	}

	async function handleJoinRoom(e: FormEvent) {
		e.preventDefault();

		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert('Room does not exixsts.');
			return
		}

		if (roomRef.val().endedAt) {
			alert('Room already closed.');
			return
		}

		navigate(`rooms/${roomCode}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letneask" />
					<button className="create-room" onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Ícone do Google" />
						Crie sua sala com o Goolge
					</button>
					<div className="separator">ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="digite o código da sala"
							onChange={e => setRoomCode(e.target.value)}
							value={roomCode}
						/>
						<Button type="submit">Entrar na Sala</Button>
					</form>
				</div>
			</main>

		</div>
	);
}
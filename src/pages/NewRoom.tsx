import '../styles/auth.scss';
import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';
import { FormEvent, useState } from 'react';

export function NewRoom() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [newRoom, setNewRoom] = useState('');

	async function handleCreateRoom(e: FormEvent) {
		e.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id
		});

		navigate(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
				<strong>Toda pergunta tem uma resposta.</strong>
				<p>Aprenda e compartilhe conhecimento com outras pessoas</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letneask" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="digite o nome da sala"
							onChange={e => setNewRoom(e.target.value)}
							value={newRoom}
						/>
						<Button type="submit">Criar sala</Button>
					</form>
					<p>Quer entrar numa sala existente? <Link to="/">clique aqui</Link></p>
				</div>
			</main>

		</div>
	);
}
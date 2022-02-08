import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
	id: string;
}

export function Room() {
	const { user } = useAuth();
	const params = useParams<RoomParams>();
	const [newQuestion, setNewQuestion] = useState('');
	const roomId = params.id;

	async function handleSendQuestion(e: FormEvent) {
		e.preventDefault()

		if (newQuestion.trim() === '') {
			return;
		}

		if (!user) {
			alert('You must be logged in.');
			throw new Error('You must be logged in.')
		}

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false
		}

		const resp = await database.ref(`rooms/${roomId}/questions`).push(question);
		setNewQuestion('');
		
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<RoomCode code={params.id || ''}/>
				</div>
			</header>

			<main className="content">
				<div className="room-title">
					<h1>Sala React</h1>
					<span>4 perguntas</span>
				</div>

				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder="O que você quer perguntar?"
						value={newQuestion}
						onChange={e => setNewQuestion(e.target.value)}
					/>
					<div className="form-footer">
						{ user ? (
							<div className="user-info">
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>Para enviar uma pergunta, <button>faça seu login</button></span>	
						)}						
						<Button type="submit" disabled={!user}>Enviar Pergunta</Button>
					</div>
				</form>
			</main>
		</div>
	);
}
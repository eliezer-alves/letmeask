import deleteImg from '../assets/images/delete.svg';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
	id: string;
}

export function AdminRoom() {
	const params = useParams<RoomParams>();
	const roomId = params.id ?? '';
	const { title, questions } = useRoom(roomId);

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
						<div>
							<RoomCode code={params.id ?? ''}/>
							<Button isOutlined>Encerrar sala</Button>
						</div>
				</div>
			</header>

			<main className="content">
				<div className="room-title">
					<h1>Sala {title}</h1>
					{ questions.length >0 &&  <span>{questions.length} perguntas</span>}
					
				</div>

				<div className="question-list">

					{questions.map(question => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
							>
								<button onClick={() => { handleDeleteQuestion(question.id)} }>
									<img src={deleteImg} alt="Remover pergunta" />
								</button>
							</Question>
							);
					})}
				</div>
			</main>
		</div>
	);
}
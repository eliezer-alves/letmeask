import deleteImg from '../assets/images/delete.svg';

import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
	id: string;
}

export function AdminRoom() {
	const navigate = useNavigate();
	const params = useParams<RoomParams>();
	const roomId = params.id ?? '';
	const { title, questions } = useRoom(roomId);

	async function handleEndRoom() {
		if (window.confirm('Tem certeza que deseja encerrar essa sala permanentemente?')) {
			await database.ref(`rooms/${roomId}`).update({
				endedAt: new Date()
			});
			navigate('/');
		}
	}	

	async function handleCheckQuestionAsAnswered(questionId: string, isAnswered: boolean) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: !isAnswered
		});
	}

	async function handleHighlightQuestion(questionId: string, isHighlighted:boolean) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: !isHighlighted
		});
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img onClick={() => navigate('/')} src={logoImg} alt="Letmeask" />
						<div>
							<RoomCode code={params.id ?? ''}/>
							<Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
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
								isAnswered={question.isAnswered}
								isHighlighted={question.isHighlighted}
							>
								{!question.isAnswered && (
									<>
										<button
											className={question.isAnswered ? 'active-icon' : ''}
											onClick={() => { handleCheckQuestionAsAnswered(question.id, question.isAnswered)} }
										>									
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
													<path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											</svg>
										</button>

										<button
											className={question.isHighlighted ? 'active-icon' : ''}
											onClick={() => { handleHighlightQuestion(question.id, question.isHighlighted)} }
										>
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											</svg>
										</button>
									</>
								)}

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
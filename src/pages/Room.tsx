import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/room.scss';

export function Room() {
	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<div>código</div>
				</div>
			</header>

			<main className="content">
				<div className="room-title">
					<h1>Sala React</h1>
					<span>4 perguntas</span>
				</div>

				<form>
					<textarea placeholder="O que você quer pergunytar?" />
					<div className="form-footer">
						<span>Para enviar uma pergunta, <button>faça seu login</button></span>
						<Button type="submit">Enviar Pergunta</Button>
					</div>
				</form>
			</main>

		</div>
	);
}
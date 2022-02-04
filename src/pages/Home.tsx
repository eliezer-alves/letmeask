import { useNavigate  } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
    const navigate = useNavigate();

    function navigateToNewRoom() {
        navigate('rooms/new');
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
                    <button className="create-room" onClick={navigateToNewRoom}>
                        <img src={googleIconImg} alt="Ícone do Google" />
                        Crie sua sala com o Goolge
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="digite o código da sala"
                        />
                        <Button type="submit">Entrar na Sala</Button>                        
                    </form>
                </div>
            </main>
            
        </div>
    );
}
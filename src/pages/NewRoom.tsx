import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../App';

export function NewRoom() {
    const { user } = useContext(AuthContext)

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
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form action="">
                        <input
                            type="text"
                            placeholder="digite o nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>                        
                    </form>
                    <p>Quer entrar numa sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
            
        </div>
    );
}
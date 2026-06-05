import { Link } from "react-router-dom"
import Card from "../components/ui/Card"

const Home = () => {
  return (
    <div className="
          grid grid-cols-1 lg:grid-cols-4
          gap-4 lg:gap-8
          auto-rows-max
          w-full
        ">
          
          <Link to="/tasks" className="no-underline block col-span-1 lg:col-span-2 row-span-1 lg:row-span-2">
              <Card
                title="MINHAS TAREFAS"
                description="Veja Tudo • Edite • Conclua • Organize"
              />
          </Link>

          <Link to="/create" className="no-underline block col-span-1 lg:col-span-2 row-span-1">
              <Card
                title="CRIAR TAREFAS"
                description="Nova Tarefa em 30s • Prioridades • Prazos"
              />
          </Link>

          <Link to="/schedule" className="no-underline block col-span-1 lg:col-span-2 row-span-1">
              <Card
                title="AGENDAMENTOS"
                description="Datas • Lembretes • Recorrentes • Calendário"
              />
          </Link>
          
        </div>
  )
}

export default Home
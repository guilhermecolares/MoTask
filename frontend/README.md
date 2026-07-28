# 🗂️ MoTask

Gerenciador de tarefas fullstack com autenticação JWT, design glassmorphism e deploy em produção. Construído inteiramente do zero, entendendo cada linha de código.

🌐 **Acesse:** [mo-task-v1.vercel.app](https://mo-task-v1.vercel.app)  
🔑 **Conta Demo:** demo@motask.com / demo123

---

## 🚀 Tecnologias

### Frontend
- React 19 + Vite
- Tailwind CSS (glassmorphism)
- Zustand (3 stores)
- Axios (interceptors JWT)
- Lucide React (ícones)

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken) + bcryptjs
- CORS configurado

### Deploy
- Frontend: Vercel
- Backend: Render
- Banco: MongoDB Atlas

---

## ✅ Funcionalidades

- 🔐 Autenticação JWT (registro, login, logout)
- 📋 CRUD completo de tarefas
- 🏷️ Tags, categorias e prioridades
- 🔍 Filtros, ordenação e busca
- 📅 Calendário de agendamentos (Schedule)
- 📊 Dashboard com estatísticas (Home)
- ✅ Modo de seleção múltipla
- ⋮ Menu de contexto (editar, deletar, duplicar)
- 🔔 Toast de feedback
- 💀 Skeleton loaders
- 🎨 Glassmorphism design system
- 📱 Responsivo (mobile + desktop)
- 🔒 Token expirado → redireciona para login

---

## 📸 Screenshots

### Home (Dashboard)
![Home](screenshots/Home.jpeg)

### Tarefas
![Tarefas](screenshots/Tasks.jpeg)

### Calendário
![Calendário](screenshots/Schedule.jpeg)

### Criar Tarefa
![Criar Tarefa](screenshots/Create.jpeg)

### Login
![Login](screenshots/Login.jpeg)

### Perfil
![Perfil](screenshots/Profile.jpeg)

---

## 🛠️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/guilhermecolares/MoTask.git

# Backend
cd MoTask/backend
npm install
npm run dev

# Frontend
cd MoTask/frontend
npm install
npm run dev
```

⚠️ Crie um arquivo `.env` no backend com as variáveis `MONGO_URL`, `JWT_SECRET` e `PORT`.

---

Feito com ❤️ por [Guilherme Colares](https://github.com/guilhermecolares)
## Habits Tracker Frontend

Este proyecto es el **frontend** del Habits Tracker, desarrollado con **Next.js** y **Redux Toolkit**.  
Permite mostrar y gestionar hábitos conectándose con la **API backend**.

---

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web modernas.  
- **React**: Librería para crear interfaces de usuario.  
- **Redux Toolkit**: Manejo de estado global en la aplicación.  
- **TypeScript**: Tipado estático para mayor seguridad y claridad de código.

---

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Hyasmin96/habits-tracker-frontend.git

cd habits-tracker-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecución
```bash
npm run dev
```

> El frontend estará corriendo en: http://localhost:3000/

---

## Funcionalidades principales

- Mostrar la lista de hábitos obtenidos desde el backend.
- Cada hábito aparece en una lista con viñetas.
- Conectar con el backend en http://localhost:3001/habits mediante fetch/Redux.

---
**Notas adicionales:**

```text

- Es recomendable tener el backend corriendo en localhost:3001 para que la aplicación funcione correctamente.

- Se utiliza fetch y Redux Toolkit para manejar el estado y la obtención de datos.

- Puedes personalizar los estilos en app/page.tsx o app/layout.tsx.

```

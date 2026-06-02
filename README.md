# Online Medical Health Tracker (OMHT) - Frontend

Interfaz de usuario (SPA) desarrollada en React para el sistema Online Medical Health Tracker (OMHT), un proyecto académico para la Universidad del Magdalena. Este frontend proporciona una experiencia de usuario fluida e interactiva para la gestión integral de consultorios médicos, personal, pacientes y agendamiento de citas.

## Tecnologías Utilizadas

* **React (v18+)** (Librería principal para la construcción de interfaces)
* **React Router DOM** (Enrutamiento dinámico y navegación SPA)
* **Context API** (Gestión de estado global de la aplicación)
* **CSS Nativo** (Estilos modulares, Flexbox y Grid sin dependencias externas)
* **Fetch API** (Comunicación asíncrona con el backend de Spring Boot)

## Arquitectura y Patrones

El proyecto está estructurado para maximizar la reutilización de código y la separación de responsabilidades:
* **Contextos y Reducers (`/context`, `/reducers`):** Manejo centralizado del estado para Pacientes, Doctores, Citas y Consultorios, evitando el *prop drilling*.
* **Custom Hooks (`/hooks`):** Lógica encapsulada y reutilizable como `useApi` para peticiones HTTP, `useModal` para ventanas emergentes y `useFilter` para búsquedas en tablas.
* **Servicios (`/services`):** Capa de abstracción para todas las llamadas a la API REST, manteniendo los componentes limpios y enfocados en la vista.
* **Componentes Modulares (`/components`):** Uso intensivo de modales (`BaseModal`, formularios de creación/edición) y tarjetas de estadísticas (`StatCard`) para una UI limpia.

## Características Principales (Módulos)

1. **Dashboard Interactiva (`/dashboard`):** Panel principal con métricas en tiempo real obtenidas desde el backend (Productividad de doctores, Cancelaciones, Citas de hoy).
2. **Gestión de Pacientes (`/patients`):** CRUD completo con vistas detalladas y control de estado (Activo/Inactivo).
3. **Gestión de Doctores (`/doctors`):** Administración del personal médico, asignación de especialidades y configuración de horarios de trabajo (Schedules).
4. **Agendamiento de Citas (`/appointments`):** Sistema inteligente de reservas que valida en tiempo real la disponibilidad del doctor seleccionado cruzando su horario laboral y citas previas.
5. **Administración de Consultorios (`/offices`):** Control de infraestructura física.
6. **Catálogos (`/catalogs`):** Mantenimiento de tipos de citas y especialidades médicas.

## Requisitos Previos

* Node.js (v16 o superior)
* npm (Node Package Manager)
* El backend de OMHT (Spring Boot) debe estar en ejecución.

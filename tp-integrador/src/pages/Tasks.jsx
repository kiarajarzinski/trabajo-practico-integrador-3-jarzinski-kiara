import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { useForm } from "../hooks/useForm.js";
import { Footer } from "../components/Footer.jsx";

//componente tasks
export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { form, handleChange, handleReset, setForm } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });
  const navigate = useNavigate();

  //obtener tareas
  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al obtener las tareas");
      setTasks(await res.json());
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // Crear o actualizar tarea
  const handleSubmit = async (e, taskId = null) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim())
      return alert("Completa todos los campos");
    // taskId viene nulo si esta creando
    const url = taskId
      ? `http://localhost:3000/api/tasks/${taskId}`
      : "http://localhost:3000/api/tasks";
    const method = taskId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      //si la respuesta no es ok
      if (!res.ok) throw new Error("Error al guardar la tarea");
      alert(taskId ? "Tarea actualizada" : "Tarea creada");
//resetear el formulario
      handleReset();
      setEditingTaskId(null);
      getTasks();
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la tarea");
    }
  };

  // Cargar tarea en el formulario para editar
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  //eliminar tarea
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta tarea?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Error al eliminar la tarea");

      //eliminar la tarea del estado
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Tarea eliminada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar (fetch))");
    }
  };
  //marcar tarea como completada
  const checkTaskComplete = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            is_completed: !task.is_completed,
          }),
        }
      );
      //si la respuesta no es ok
      if (!response.ok) throw new Error("Error al marcar como completado");
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, is_completed: !t.is_completed } : t
        )
      );
    } catch (error) {
      console.log(Error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />

      {/* Formulario para crear tarea */}
      <form
        onSubmit={(evento) => handleSubmit(evento)}
        className="card p-4 mx-auto mb-4 w-100"
        style={{ maxWidth: "720px" }}
      >
        <h2 className="h5 text-center mb-3">Crear nueva tarea</h2>

        <div className="d-grid gap-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título"
            className="form-control"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="form-control"
            rows={3}
          />

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="is_completed"
              name="is_completed"
              checked={form.is_completed}
              onChange={(evento) =>
                handleChange({
                  target: { name: "is_completed", value: e.target.checked },
                })
              }
            />
            <label className="form-check-label" htmlFor="is_completed">
              ¿Tarea completada?
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear tarea
          </button>
        </div>
      </form>

      <div className="card mx-auto mb-4 w-100 text-center" style={{ maxWidth: "720px" }}>
        <div className="card-body">
          <h3 className="h6 mb-2">Tareas</h3>
          <p>
            Total: <strong>{tasks.length}</strong>
          </p>
          <p>
            Completadas: <strong className="text-success">{tasks.filter((t) => t.is_completed).length}</strong>
          </p>
          <p>
            Pendientes: <strong className="text-warning">{tasks.filter((t) => !t.is_completed).length}</strong>
          </p>
        </div>
      </div>

      <div className="mx-auto w-100" style={{ maxWidth: "720px" }}>
        {tasks.length === 0 ? (
          <p className="text-center text-muted">No hay tareas.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="card mb-3">
              <div className="card-body">
                {editingTaskId === task.id ? (
                  <form onSubmit={(evento) => handleSubmit(evento, task.id)} className="d-grid gap-2">
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="form-control"
                      rows={3}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`edit_completed_${task.id}`}
                        name="is_completed"
                        checked={form.is_completed}
                        onChange={(evento) =>
                          handleChange({
                            target: {
                              name: "is_completed",
                              value: e.target.checked,
                            },
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor={`edit_completed_${task.id}`}>
                        ¿Tarea completada?
                      </label>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success flex-fill">
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTaskId(null);
                          handleReset();
                        }}
                        className="btn btn-secondary flex-fill"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="h6 fw-semibold">{task.title}</h3>
                    <p className="mb-1">{task.description}</p>
                    <p className={`fw-medium mt-2 ${task.is_completed ? "text-success" : "text-warning"}`}>
                      {task.is_completed ? "Completada" : "Pendiente"}
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <button onClick={() => handleEdit(task)} className="btn btn-primary flex-fill">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(task.id)} className="btn btn-danger flex-fill">
                        Eliminar
                      </button>
                      <button
                        onClick={() => checkTaskComplete(task)}
                        className={`flex-fill btn ${task.is_completed ? "btn-warning" : "btn-success"}`}
                      >
                        {task.is_completed ? "Marcar como pendiente" : "Marcar como completada"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};
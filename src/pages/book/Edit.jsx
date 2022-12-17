import { useParams } from "react-router-dom";
import { Form } from "../../components/Form";

function EditBook() {
  const { id } = useParams();

  return (
    <>
      <h1 className="title">Editar Livro</h1>
      <Form type="edit" id={id} />
    </>
  );
}

export default EditBook;

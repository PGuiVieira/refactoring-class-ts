import { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { Modal } from "../Modal";
import { Form } from "./styles";
import { Input } from "../Input/index";

type Food = {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
};

interface ModalAddFoodProps {
  setIsOpen: () => void;
  handleAddFood: (food: Food) => Promise<void>;
  isOpen: boolean;
}

export function ModalAddFood({
  setIsOpen,
  handleAddFood,
  isOpen,
}: ModalAddFoodProps) {
  const formRef = createRef();

  async function handleSubmit(data: Food) {
    handleAddFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

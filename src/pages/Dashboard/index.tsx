import { useEffect } from "react";
import { useState } from "react";
import { Food } from "../../components/Foods";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import api from "../../services/api";
import { FoodsContainer } from "./styles";

type Food = {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
};

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [foods, setFoods] = useState<Food[]>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food>();

  useEffect(() => {
    const response = api
      .get("/foods")
      .then((response) => setFoods(response.data));
  }, []);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  async function handleAddFood(food: Food) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });
      if (foods) {
        setFoods([...foods, response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleUpdateFood(food: Food) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood!.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods!.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: Food) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods!.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood!}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

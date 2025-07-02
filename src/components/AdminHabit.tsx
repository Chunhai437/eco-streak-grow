import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  createHabit,
  deleteHabit,
  getAllHabit,
  Habit,
  updateHabit,
} from "@/services/HabitApi";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Spinner } from "./Spinner/Spinner";
import { fi } from "date-fns/locale";

export const AdminHabit = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });
  const [habits, setHabits] = useState([]);

  const [editingHabit, setEditingHabit] = useState({
    _id: "",
    name: "",
    description: "",
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchHabits(); // chỉ fetch nếu đúng quyền
    }
  }, [user]); // hoặc [user, isAdmin]
  const fetchHabits = async () => {
    try {
      setLoadingPage(true);
      const data = await getAllHabit();
      setHabits(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách thói quen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const handleCreateHabit = async () => {
    if (!newHabit.name || !newHabit.description) return;

    try {
      setLoading(true);
      const now = new Date().toISOString();
      const habitToCreate: Habit = {
        ...newHabit,
        createdAt: now,
        updatedAt: now,
      };

      const created = await createHabit(habitToCreate);
      toast({
        title: "Tạo thói quen thành công!",
        description: `Thói quen "${created.name}" đã được thêm vào.`,
      });

      setNewHabit({ name: "", description: "", createdAt: "", updatedAt: "" });
      fetchHabits();
    } catch (error) {
      toast({
        title: "Lỗi tạo thói quen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditHabit = (habit) => {
    setEditingHabit({
      _id: habit._id,
      name: habit.name,
      description: habit.description,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateHabit = async () => {
    if (!editingHabit.name || !editingHabit.description) return;
    setLoading(true);
    // Simulate API call to update habit
    const updatedHabit = {
      name: editingHabit.name,
      description: editingHabit.description,
      updatedAt: new Date().toISOString(),
    };

    // Call the API to update the habit
    await updateHabit(updatedHabit, editingHabit._id);

    toast({
      title: "Cập nhật thói quen thành công!",
      description: `Thói quen "${editingHabit.name}" đã được cập nhật.`,
    });
    setLoading(false);
    setIsEditDialogOpen(false);
    setEditingHabit({ _id: "", name: "", description: "" });
    fetchHabits();
  };

  const handleDeleteHabit = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thói quen này không?"))
      return;

    try {
      await deleteHabit(id);
      toast({
        title: "Đã xóa thói quen",
        description: "Thói quen đã được xóa thành công.",
      });
      fetchHabits(); // Refresh danh sách
    } catch (error) {
      toast({
        title: "Lỗi xóa thói quen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loadingPage || !user) {
    return <Spinner />;
  }

  return (
    <>
      {/* Create New Habit */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo thói quen mới
          </CardTitle>
          <CardDescription>
            Thêm thói quen gốc cho người dùng lựa chọn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Tên thói quen"
              value={newHabit.name}
              onChange={(e) =>
                setNewHabit({ ...newHabit, name: e.target.value })
              }
            />
          </div>
          <Textarea
            placeholder="Mô tả thói quen"
            value={newHabit.description}
            onChange={(e) =>
              setNewHabit({ ...newHabit, description: e.target.value })
            }
          />
          <div className="flex items-center gap-4">
            <Button
              onClick={handleCreateHabit}
              className="gradient-green text-white"
              disabled={loading}
            >
              {loading ? "Đang tạo thói quen..." : "Tạo thói quen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Habits */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800">Danh sách thói quen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-green-800">
                      {habit.name}
                    </h4>
                    <Badge variant="secondary">Bảo vệ môi trường</Badge>
                    {/* <Badge variant="outline" className="text-green-600">
                            {habit.points} điểm
                          </Badge> */}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {habit.description}
                  </p>
                  {/* <div className="text-xs text-gray-500">
                          Được sử dụng bởi {habit.usage} người dùng
                        </div> */}
                  <div className="text-xs text-gray-500">
                    Ngày tạo:{" "}
                    {new Date(habit.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditHabit(habit)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteHabit(habit._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Habit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-green-800">
              Chỉnh sửa thói quen
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tên thói quen
              </label>
              <Input
                placeholder="Tên thói quen"
                value={editingHabit.name}
                onChange={(e) =>
                  setEditingHabit({ ...editingHabit, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mô tả
              </label>
              <Textarea
                placeholder="Mô tả thói quen"
                value={editingHabit.description}
                onChange={(e) =>
                  setEditingHabit({
                    ...editingHabit,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdateHabit}
                className="gradient-green text-white"
                disabled={
                  !editingHabit.name || !editingHabit.description || loading
                }
              >
                {loading ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

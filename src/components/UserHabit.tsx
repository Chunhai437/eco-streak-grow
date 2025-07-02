import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { getAllHabit } from "@/services/HabitApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { createChallenge } from "@/services/Challenge";
import { useNavigate } from "react-router-dom";

export const UserHabit = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    targetDay: "",
    habitId: "",
    startDate: "",
  });

  const [isChallengeDialogOpen, setIsChallengeDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);
  const fetchHabits = async () => {
    try {
      const data = await getAllHabit();
      setHabits(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách thói quen",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  const handleCreateChallenge = (habitId: string) => {
    const now = new Date().toISOString();
    setNewChallenge({
      title: "",
      targetDay: "",
      habitId: habitId,
      startDate: now,
    });
    setIsChallengeDialogOpen(true);
  };

  const handleSubmitChallenge = async () => {
    setIsLoading(true);
    if (!newChallenge.title || !newChallenge.targetDay) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const targetDays = parseInt(newChallenge.targetDay);
    if (isNaN(targetDays) || targetDays <= 0) {
      toast({
        title: "Lỗi!",
        description: "Số ngày phải là một số dương.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Create challenge here
    const newChallengeData = { ...newChallenge, targetDays, userId: user.id };
    await createChallenge(newChallengeData);
    setIsLoading(false);
    toast({
      title: "Tạo thử thách thành công!",
      description: `Thử thách "${newChallenge.title}" trong ${targetDays} ngày đã được tạo.`,
    });
    window.location.reload();

    setIsChallengeDialogOpen(false);
    setNewChallenge({ title: "", targetDay: "", habitId: "", startDate: "" });
  };

  if (habits.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Chưa có thói quen gốc nào được tạo.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {habits.map((habit) => (
          <Card
            key={habit._id}
            className="glass-effect hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-green-800">{habit.name}</CardTitle>
              <CardDescription>{habit.description}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Bảo vệ môi trường</Badge>
                {/* <Badge variant="outline" className="text-green-600">
                        {habit.points} điểm
                      </Badge> */}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full gradient-green text-white"
                onClick={() => handleCreateChallenge(habit._id)}
              >
                Tạo thử thách
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Challenge Dialog */}
      <Dialog
        open={isChallengeDialogOpen}
        onOpenChange={setIsChallengeDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-green-800">
              Tạo thử thách mới
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tên thử thách
              </label>
              <Input
                placeholder="Nhập tên thử thách"
                value={newChallenge.title}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Số ngày thực hiện
              </label>
              <Input
                type="number"
                placeholder="Nhập số ngày (ví dụ: 30)"
                value={newChallenge.targetDay}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    targetDay: e.target.value,
                  })
                }
                min="1"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsChallengeDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmitChallenge}
                className="gradient-green text-white"
                disabled={isLoading}
              >
                {isLoading ? "Đang tạo thử thách..." : "Tạo thử thách"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

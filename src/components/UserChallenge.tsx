import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckCircle, Circle, Gift, Trophy } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { checkInChallenge, getUserChallenge } from "@/services/Challenge";
import { isSameDay } from "date-fns";
import { Spinner } from "./Spinner/Spinner";

export const UserChallenge = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [challenges, setChallenges] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchChallenges();
  }, [user]);

  const fetchChallenges = async () => {
    try {
      setLoadingPage(true);
      const data = await getUserChallenge(user?.id);
      setChallenges(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách thử thách",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const handleDailyCheck = async (
    challengeId: string,
    title: string,
    isCheckedToday: boolean
  ) => {
    if (isCheckedToday) return alert("Thử thách này đã hoàn thành rồi!");

    try {
      await checkInChallenge(challengeId, user?.id);
      // Cập nhật state ngay sau khi check-in thành công
      const today = new Date().toISOString();

      setChallenges((prev) =>
        prev.map((ch) =>
          ch._id === challengeId
            ? {
                ...ch,
                completedDays: [...ch.completedDays, today],
                streak: ch.streak + 1,
              }
            : ch
        )
      );
      toast({
        title: "Tuyệt vời! 🎉",
        description: `Bạn đã hoàn thành thử thách "${title}" hôm nay!`,
      });
      // fetchChallenges();
    } catch (error) {
      toast({
        title: "Lỗi khi check-in",
        description: "Bạn đã hoàn thành thử thách này hôm nay rồi!",
        variant: "destructive",
      });
    }
  };

  const renderPlantProgress = (streak: number, total: number) => {
    const stages = [
      { stage: 0, emoji: "🌱", name: "Mầm cây" },
      { stage: Math.floor(total * 0.3), emoji: "🌿", name: "Lá non" },
      { stage: Math.floor(total * 0.6), emoji: "🌳", name: "Cây nhỏ" },
      { stage: total, emoji: "🌸", name: "Bông hoa" },
    ];

    const currentStage = stages.reduce((prev, curr) =>
      streak >= curr.stage ? curr : prev
    );

    return (
      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
        <div className="text-6xl mb-4">{currentStage.emoji}</div>
        <div className="text-lg font-semibold text-green-700">
          {currentStage.name}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          {streak}/{total} ngày - Tiếp tục chăm sóc cây của bạn! 🌱
        </div>
      </div>
    );
  };

  const renderPuzzleProgress = (streak: number, total: number) => {
    const completedPieces = streak;
    const totalPieces = total;

    return (
      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
        <div className="grid grid-cols-6 gap-1 max-w-48 mx-auto mb-4">
          {Array.from({ length: totalPieces }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-sm border-2 ${
                index < completedPieces
                  ? "bg-gradient-to-br from-purple-400 to-pink-400 border-purple-300"
                  : "bg-gray-100 border-gray-200"
              }`}
            />
          ))}
        </div>
        <div className="text-lg font-semibold text-purple-700">
          {completedPieces}/{totalPieces} mảnh ghép
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Hoàn thành puzzle để nhận voucher! 🧩
        </div>
      </div>
    );
  };

  if (loadingPage || !user) {
    return <Spinner />;
  }

  if (challenges.length === 0) {
    return (
      <div className="flex flex-col items-center h-screen text-gray-600 ">
        <h1 className="text-3xl font-bold text-center mt-4">
          Chưa có thử thách nào được tạo
          <br />
          <span>Hãy đến phần thói quen gốc để tạo thử thách!</span>
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-6">
        {challenges.map((challenge) => {
          const progress = (challenge.streak / challenge.targetDays) * 100;
          const isCheckedToday = challenge.completedDays.some((day: string) =>
            isSameDay(day, new Date().toISOString())
          );
          console.log(isCheckedToday);

          return (
            <Card key={challenge._id} className="glass-effect">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {challenge.habitId.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-green-600">
                        {challenge.streak}/{challenge.targetDays} ngày
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      handleDailyCheck(
                        challenge._id,
                        challenge.title,
                        isCheckedToday
                      )
                    }
                    variant={isCheckedToday ? "default" : "outline"}
                    className={
                      isCheckedToday ? "gradient-green text-white" : ""
                    }
                  >
                    {isCheckedToday ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <Circle className="w-4 h-4 mr-2" />
                    )}
                    {isCheckedToday ? "Đã hoàn thành" : "Hoàn thành"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Tiến độ</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={Math.round(progress)} className="h-2" />
                </div>

                {renderPlantProgress(challenge.streak, challenge.targetDays)}

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
                    <Gift className="w-4 h-4" />
                    Phần thưởng
                  </div>
                  <div className="text-sm text-yellow-700">
                    Đừng bỏ lỡ! Hoàn thành thử thách ngay và nhận những phần
                    thưởng cực hấp dẫn đang chờ bạn!
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

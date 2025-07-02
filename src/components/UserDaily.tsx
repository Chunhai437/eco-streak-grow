import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getDailyLog } from "@/services/DailyLog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, isYesterday, subDays } from "date-fns";
import { da, vi } from "date-fns/locale";

interface DailyLog {
  _id: string;
  userId: string;
  date: string;
  status: string;
  challengeId: {
    _id: string;
    title: string;
    streak: number;
    completedDays: string[];
  };
}

export const UserDaily = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchDailyLogs();
  }, [user]);

  const fetchDailyLogs = async () => {
    try {
      const data = await getDailyLog(user?.id);
      setDailyLogs(data);
    } catch (error) {
      toast({
        title: "Không thể tải logs",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const totalCompletedToday = dailyLogs.filter((log) =>
    isToday(new Date(log.date))
  ).length;

  const maxStreak = dailyLogs.reduce(
    (max, log) => (log.challengeId.streak > max ? log.challengeId.streak : max),
    0
  );

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Hôm nay";
    if (isYesterday(date)) return "Hôm qua";
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalCompletedToday}
            </div>
            <div className="text-gray-600">Thử thách hoàn thành hôm nay</div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {maxStreak}
            </div>
            <div className="text-gray-600">Streak dài nhất</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect mt-6">
        <CardHeader>
          <CardTitle className="text-green-800">Lịch sử hoạt động</CardTitle>
        </CardHeader>
        <CardContent>
          {dailyLogs.length === 0 ? (
            <p className="text-black-600 text-center mt-5 text-2xl">
              Bạn chưa có hoạt động nào.
            </p>
          ) : null}
          <div className="space-y-4">
            {dailyLogs.slice(0, 5).map((log) => (
              <div
                key={log._id}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    Hoàn thành: {log.challengeId.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDateLabel(log.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

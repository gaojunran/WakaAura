import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo } from "react";
import { getSevenDayStats, getTodayStats } from "~/api/wakaStas";
import CountUp from "~/components/bits/CountUp";
import GradientText from "~/components/bits/GradientText";
import { TodayProjects } from "~/components/charts/TodayProjects";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const getToday = useServerFn(getTodayStats);
  const getSevenDay = useServerFn(getSevenDayStats);
  const todayQuery = useQuery({
    queryKey: ["today"],
    queryFn: getToday,
  });
  const sevenDayQuery = useQuery({
    queryKey: ["sevenDay"],
    queryFn: getSevenDay,
  });
  const todayTotal = useMemo(
    () => todayQuery.data?.data?.grand_total?.total_seconds ?? 0,
    [todayQuery.data],
  );
  const sevenDaysAverage = useMemo(
    () => sevenDayQuery.data?.data?.daily_average ?? 0,
    [sevenDayQuery.data],
  );
  const changeRate = useMemo(
    () => (sevenDaysAverage ? todayTotal / sevenDaysAverage - 1 : 0),
    [todayTotal, sevenDaysAverage],
  );
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="m-12 flex">
        <Card className=" w-1/3">
          <CardHeader>
            <h2 className="text-4xl font-mono ">Coding Time Today</h2>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="text-3xl font-mono -mt-2">
                <GradientText
                  animationSpeed={3}
                  className="inline pr-3 text-5xl"
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                  ]}
                >
                  <CountUp
                    from={0}
                    to={
                      todayQuery.isSuccess
                        ? todayQuery.data.data.grand_total.hours
                        : 0
                    }
                  />
                </GradientText>
                <span className="dark:text-white/50 text-black/50">h</span>
                <GradientText
                  animationSpeed={3}
                  className="inline px-3 text-5xl"
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                  ]}
                >
                  <CountUp
                    from={0}
                    to={
                      todayQuery.isSuccess
                        ? todayQuery.data.data.grand_total.minutes
                        : 0
                    }
                  />
                </GradientText>
                <span className="dark:text-white/50 text-black/50">min</span>
              </div>
              <div className="text-white/50 text-sm">
                <p>
                  {changeRate > 0 ? "+" : "-"}
                  {Math.abs(Math.floor(changeRate * 100)).toFixed(2)}% than last
                  7 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className=" w-1/3">
          <CardHeader>
            <h2 className="text-4xl font-mono ">7 days' Average</h2>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono -mt-2">
              <GradientText
                animationSpeed={3}
                className="inline pr-3 text-5xl"
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              >
                <CountUp from={0} to={Math.floor(sevenDaysAverage / 3600)} />
              </GradientText>
              <span className="dark:text-white/50 text-black/50">h</span>
              <GradientText
                animationSpeed={3}
                className="inline px-3 text-5xl"
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              >
                <CountUp
                  from={0}
                  to={
                    Math.floor(sevenDaysAverage / 60) -
                    Math.floor(sevenDaysAverage / 3600) * 60
                  }
                />
              </GradientText>
              <span className="dark:text-white/50 text-black/50">min</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <TodayProjects
        projects={
          todayQuery.isSuccess
            ? todayQuery.data.data.projects
                .filter((p) => p.total_seconds > 60 * 10)
                .map((p) => ({ name: p.name, total: p.total_seconds }))
            : []
        }
      />
    </div>
  );
}

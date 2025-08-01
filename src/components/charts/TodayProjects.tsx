interface Project {
  name: string;
  total: number;
}

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Spinner } from "../ui/shadcn-io/spinner";

const chartConfig = {
  total: {
    label: "Time",
    color: "#FCFAF2",
  },
  label: {
    color: "#FCFAF2",
  },
} satisfies ChartConfig;

export function TodayProjects({ projects }: { projects: Project[] }) {
  return (
    <Card className="m-12">
      <CardHeader>
        <CardTitle className="text-3xl font-mono font-normal">
          Today I'm working on ...
        </CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <Spinner variant="circle" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="w-full !flex"
            style={{
              height: projects.length * 30 + 40,
            }}
          >
            <BarChart
              accessibilityLayer
              data={projects}
              layout="vertical"
              margin={{
                left: 60,
                right: 20,
              }}
              className="justify-center"
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis
                dataKey="total"
                type="number"
                tickFormatter={(value) =>
                  `${Math.floor(value / 60)}h ${value % 60}min}`
                }
                hide
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="total" fill="#81C7D4" radius={5}>
                <LabelList
                  position="right"
                  offset={12}
                  className="fill-foreground z-1000"
                  fontSize={12}
                  formatter={(value) =>
                    `${Math.floor(value / 3600)}h ${Math.floor((value % 3600) / 60)}min`
                  }
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

import { z } from 'zod'

const timeSchema = z.object({
  hours: z.number().int().nonnegative(),
  minutes: z.number().int().min(0).max(59),
});

export const createGoalSchema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(2),

    targetTime: timeSchema,

    color: z.string().length(7),
    icon: z.string().min(1),
  })
  .transform((data) => {
    const targetSeconds =
      data.targetTime.hours * 3600 +
      data.targetTime.minutes * 60;

    return {
      title: data.title,
      description: data.description,

      accumulatedSeconds: 0,
      startedAt: null,

      targetSeconds,

      color: data.color,
      icon: data.icon,
    };
  });


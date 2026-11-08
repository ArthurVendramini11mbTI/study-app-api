import type { createGoalInput, goalIdType, trackGoalTimeInput } from "../types/goalTypes";
import { goalRepository } from '../repository/goalRepository'
import { userRepository } from "../repository/userRepository";
import type { userId } from "../types/userTypes";

const goalService = {
  async create(goalData: createGoalInput, userId: userId) {
    const existingUser = await userRepository.findById(userId)

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    return await goalRepository.create(goalData, userId)
  },

  async get(userId: userId) {
    return await goalRepository.getGoals(userId)
  },

  async update(goalId: goalIdType, goalData: createGoalInput, userId: userId) {
    return await goalRepository.update(goalId, goalData, userId)
  },

  async trackTime(goalId: goalIdType, action: trackGoalTimeInput['action'], userId: userId) {
    const goal = await goalRepository.findById(goalId, userId)

    if (!goal) {
      throw new Error("Goal does not exist")
    }

    if (action === 'start') {
      if (goal.started_at) {
        throw new Error("This goal already has an active session")
      }

      const startedGoal = await goalRepository.startTimeTracking(goalId, userId, new Date())

      return {
        status: 'started',
        elapsed_seconds: 0,
        goal: startedGoal
      }
    }

    if (!goal.started_at) {
      throw new Error("This goal does not have an active session")
    }

    const elapsedSeconds = Math.max(
      0,
      Math.floor((Date.now() - goal.started_at.getTime()) / 1000)
    )
    const stoppedGoal = await goalRepository.stopTimeTracking(goalId, userId, elapsedSeconds)

    return {
      status: 'stopped',
      elapsed_seconds: elapsedSeconds,
      goal: stoppedGoal
    }
  },

  async delete(goalId: goalIdType, userId: userId) {
    const deleteGoal = await goalRepository.delete(goalId, userId)

    if(!deleteGoal){
      throw new Error("Goal does not exist");
    }

    return deleteGoal
  }
};

export { goalService }

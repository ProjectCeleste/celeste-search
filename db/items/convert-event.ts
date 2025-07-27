import { Trait } from "../../api-types"

import { Item } from "../interfaces"

import {
  isHalloween2018Reward,
  isWinter2018Reward,
  //isWinterReward,

  isSummer2019Reward,
  isHalloween2019Reward,
  isWinter2019Reward,

  isSummer2020Reward,
  isHalloween2020Reward,
  isWinter2020Reward,

  isSummer2021Reward,
  isHalloween2021Reward,
  isWinter2021Reward,

  isSummer2022Reward,
  isHalloween2022Reward,
  isWinter2022Reward,

  //no summer 2023
  isHalloween2023Reward,
  isWinter2023Reward,

  //no 2024 items

  isSummer2025Reward,
  isHalloween2025Reward,
  isWinter2025Reward,
} from "./source"

export function convertEvent(trait: Trait): Item["event"] | undefined {
  if (isHalloween2018Reward(trait)) {
    return {
      name: "halloween",
      year: 2018,
    }
  }
  /*
  if (isWinterReward(trait)) {
    return {
      name: "winter",
      year: 0,
    }
  }
  */ 
  if (isWinter2018Reward(trait)) {
    return {
      name: "winter",
      year: 2018,
    }
  }

  if (isSummer2019Reward(trait)) {
    return {
      name: "summer",
      year: 2019,
    }
  }
  if (isHalloween2019Reward(trait)) {
    return {
      name: "halloween",
      year: 2019,
    }
  }
  if (isWinter2019Reward(trait)) {
    return {
      name: "winter",
      year: 2019,
    }
  }

  if (isSummer2020Reward(trait)) {
    return {
      name: "summer",
      year: 2020,
    }
  }
  if (isHalloween2020Reward(trait)) {
    return {
      name: "halloween",
      year: 2020,
    }
  }
  if (isWinter2020Reward(trait)) {
    return {
      name: "winter",
      year: 2020,
    }
  }

  if (isSummer2021Reward(trait)) {
    return {
      name: "summer",
      year: 2021,
    }
  }
  if (isHalloween2021Reward(trait)) {
    return {
      name: "halloween",
      year: 2021,
    }
  }
  if (isWinter2021Reward(trait)) {
    return {
      name: "winter",
      year: 2021,
    }
  }

  if (isSummer2022Reward(trait)) {
    return {
      name: "summer",
      year: 2022,
    }
  }
  if (isHalloween2022Reward(trait)) {
    return {
      name: "halloween",
      year: 2022,
    }
  }
  if (isWinter2022Reward(trait)) {
    return {
      name: "winter",
      year: 2022,
    }
  }

  //No Summer 2023
  if (isHalloween2023Reward(trait)) {
    return {
      name: "halloween",
      year: 2023,
    }
  }
  
  if (isWinter2023Reward(trait)) {
    return {
      name: "winter",
      year: 2023,
    }
  }

  if (isSummer2025Reward(trait)) {
    return {
      name: "summer",
      year: 2025,
    }
  }
  if (isHalloween2025Reward(trait)) {
    return {
      name: "halloween",
      year: 2025,
    }
  }
  if (isWinter2025Reward(trait)) {
    return {
      name: "winter",
      year: 2025,
    }
  }
}

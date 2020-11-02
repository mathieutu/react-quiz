export const sortRandom = <T extends any[]>(arr : T): T => arr.sort(() => 0.5 - Math.random())

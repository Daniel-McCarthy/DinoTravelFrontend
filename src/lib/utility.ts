/*
 * Generate a random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
    return Math.floor(
        (Math.random() * max) + min
    );
}

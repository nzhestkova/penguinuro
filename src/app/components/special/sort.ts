import { Material } from "../../common/models/material";

export function oldestSort(array: Material[]): void {
  array.sort((a: Material, b: Material) => {
    const yearA = a.addDate.getFullYear();
    const yearB = b.addDate.getFullYear();
    if (yearA !== yearB) {
      return yearA > yearB ? 1 : -1;
    }
    const monthA = a.addDate.getMonth();
    const monthB = b.addDate.getMonth();
    if (monthA !== monthB) {
      return monthA > monthB ? 1 : -1;
    }
    const dayA = a.addDate.getDate();
    const dayB = b.addDate.getDate();
    if (dayA !== dayB) {
      return dayA > dayB ? 1 : -1;
    }
    const hourA = a.addDate.getHours();
    const hourB = b.addDate.getHours();
    if (hourA !== hourB) {
      return hourA > hourB ? 1 : -1;
    }
    const minuteA = a.addDate.getMinutes();
    const minuteB = b.addDate.getMinutes();
    if (minuteA !== minuteB) {
      return minuteA > minuteB ? 1 : -1;
    }
    return 1;
  });
}

export function newestSort(array: Material[]): void {
  array.sort((a: Material, b: Material) => {
    const yearA = a.addDate.getFullYear();
    const yearB = b.addDate.getFullYear();
    if (yearA !== yearB) {
      return yearA < yearB ? 1 : -1;
    }
    const monthA = a.addDate.getMonth();
    const monthB = b.addDate.getMonth();
    if (monthA !== monthB) {
      return monthA < monthB ? 1 : -1;
    }
    const dayA = a.addDate.getDate();
    const dayB = b.addDate.getDate();
    if (dayA !== dayB) {
      return dayA < dayB ? 1 : -1;
    }
    const hourA = a.addDate.getHours();
    const hourB = b.addDate.getHours();
    if (hourA !== hourB) {
      return hourA < hourB ? 1 : -1;
    }
    const minuteA = a.addDate.getMinutes();
    const minuteB = b.addDate.getMinutes();
    if (minuteA !== minuteB) {
      return minuteA < minuteB ? 1 : -1;
    }
    return -1;
  });
}

/**
 * Бюджет поездки.
 *
 * Главная фишка расчёта: бензин считается ОТДЕЛЬНО для каждой машины.
 * У Чангана-гибрида расход 4.5 л/100км, у Tenet T7 — 7.5 л/100км.
 * Поэтому пассажир Чангана платит за топливо заметно меньше.
 *
 * Расход в калькуляторе можно править прямо на странице — функции ниже
 * принимают `consumption` параметром; число из `CARS` это лишь дефолт.
 *
 * Цена бензина и расходы выверены через веб-ресёрч (май 2026).
 * Чтобы поменять цифры — редактируйте константы ниже.
 */

import { CARS, TRIP } from "./trip";

/** Цена литра АИ-95, ₽. Задана заказчиком (фактическая цена по трассе, май 2026 — 67–69 ₽). */
export const FUEL_PRICE = 68;

/** Уровни поездки */
export type Tier = "economy" | "comfort" | "business";

export interface TierConfig {
  id: Tier;
  label: string;
  tagline: string;
  /** ₽/чел за ночь жилья */
  lodgingPerNight: number;
  /** ₽/чел в день на еду */
  foodPerDay: number;
  /** ₽/чел на активности за всю поездку */
  activities: number;
  /** ₽/чел резерв */
  reserve: number;
}

/** Ночей в поездке (12 дней — 11 ночёвок, последняя в дороге) */
export const NIGHTS = 11;

export const TIERS: TierConfig[] = [
  {
    id: "economy",
    label: "Эконом",
    tagline: "Хостелы и гостевые дома, готовим сами, минимум платных активностей",
    lodgingPerNight: 1100,
    foodPerDay: 900,
    activities: 9500,
    reserve: 4000,
  },
  {
    id: "comfort",
    label: "Комфорт",
    tagline: "Нормальные отели, кафе, все канатки и заброски из маршрута",
    lodgingPerNight: 2000,
    foodPerDay: 1500,
    activities: 13100,
    reserve: 5000,
  },
  {
    id: "business",
    label: "Бизнес",
    tagline: "Хорошие отели, рестораны, всё с запасом и без экономии",
    lodgingPerNight: 3800,
    foodPerDay: 2800,
    activities: 16500,
    reserve: 8000,
  },
];

/** Сколько человек минимум и максимум есть смысл сажать в одну машину */
export const SEATS_MIN = 1;
export const SEATS_MAX = 5;

/** Осмысленные границы расхода топлива, л/100 км — для поля ввода в калькуляторе */
export const CONSUMPTION_MIN = 3;
export const CONSUMPTION_MAX = 20;
/** Шаг изменения расхода степпером */
export const CONSUMPTION_STEP = 0.5;

/**
 * Расход топлива на одну машину за всю поездку (туда-обратно).
 * Бензин на машину фиксированный — он не зависит от числа людей в салоне;
 * меняется только сумма на одного пассажира при делении на `people`.
 *
 * @param people сколько человек делят бак. По умолчанию — штатный экипаж машины.
 * @param consumption расход л/100 км. По умолчанию — штатный расход машины из `CARS`.
 */
export function fuelForCar(
  carId: string,
  people?: number,
  consumption?: number,
  fuelPrice = FUEL_PRICE,
) {
  const car = CARS.find((c) => c.id === carId);
  if (!car) throw new Error(`Машина ${carId} не найдена`);
  const seats = clampSeats(people ?? car.crew.length);
  const rate = clampConsumption(consumption ?? car.consumption);
  const liters = (TRIP.totalKm * rate) / 100;
  const rubles = Math.round(liters * fuelPrice);
  return {
    car,
    seats,
    consumption: rate,
    liters: Math.round(liters),
    rublesPerCar: rubles,
    rublesPerPerson: Math.round(rubles / seats),
  };
}

/** Удерживает число пассажиров в осмысленном диапазоне */
export function clampSeats(n: number) {
  return Math.min(SEATS_MAX, Math.max(SEATS_MIN, Math.round(n)));
}

/** Удерживает расход топлива в осмысленном диапазоне (округляет до 0.1) */
export function clampConsumption(n: number) {
  if (!Number.isFinite(n)) return CONSUMPTION_MIN;
  const rounded = Math.round(n * 10) / 10;
  return Math.min(CONSUMPTION_MAX, Math.max(CONSUMPTION_MIN, rounded));
}

/**
 * Полный бюджет на одного человека для конкретной машины и уровня.
 *
 * @param people сколько человек делят бензин этой машины (влияет только на топливо).
 * @param consumption расход л/100 км (по умолчанию — штатный расход машины).
 */
export function budgetPerPerson(
  carId: string,
  tier: Tier,
  people?: number,
  consumption?: number,
  fuelPrice = FUEL_PRICE,
) {
  const config = TIERS.find((t) => t.id === tier)!;
  const fuel = fuelForCar(carId, people, consumption, fuelPrice).rublesPerPerson;
  const lodging = config.lodgingPerNight * NIGHTS;
  const food = config.foodPerDay * TRIP.days;
  const total = fuel + lodging + food + config.activities + config.reserve;
  return {
    fuel,
    lodging,
    food,
    activities: config.activities,
    reserve: config.reserve,
    total,
  };
}

/** Сравнение с альтернативой — для секции бюджета */
export const COMPARISON = {
  label: "Турция, all-inclusive, 12 дней из Екатеринбурга",
  range: "90–120 тыс. ₽",
  punchline: "И ни одного Эльбруса.",
};

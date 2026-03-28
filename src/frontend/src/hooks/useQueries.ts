import { useQuery } from "@tanstack/react-query";
import type { Animal } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllAnimals() {
  const { actor, isFetching } = useActor();
  return useQuery<Animal[]>({
    queryKey: ["animals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnimals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

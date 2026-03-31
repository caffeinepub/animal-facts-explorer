import { useQuery } from "@tanstack/react-query";
import type { Dinosaur } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllDinosaurs() {
  const { actor, isFetching } = useActor();
  return useQuery<Dinosaur[]>({
    queryKey: ["dinosaurs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDinosaurs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetQuickFunFacts() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["funFacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuickFunFacts();
    },
    enabled: !!actor && !isFetching,
  });
}

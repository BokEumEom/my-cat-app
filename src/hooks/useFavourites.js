import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavourites, addFavourite, removeFavourite } from "../api/catApi";

export function useFavourites() {
  const queryClient = useQueryClient();

  // 즐겨찾기 목록 조회
  const { data: favourites = [], isLoading, error } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });

  // 즐겨찾기 추가 Mutation
  const addFavouriteMutation = useMutation({
    mutationFn: addFavourite,
    onSuccess: () => {
      // 성공 시 즐겨찾기 목록을 다시 불러옵니다.
      queryClient.invalidateQueries(["favourites"]);
    },
  });

  // 즐겨찾기 삭제 Mutation
  const removeFavouriteMutation = useMutation({
    mutationFn: removeFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries(["favourites"]);
    },
  });

  return {
    favourites,
    isLoading,
    error,
    addFavourite: addFavouriteMutation.mutate,
    removeFavourite: removeFavouriteMutation.mutate,
  };
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavsStoreState = { favs: string[] };

type FavsStoreActions = {
	setFav: (id: string) => void;
};

type FavsStore = FavsStoreState & FavsStoreActions;

const useFavsStore = create<FavsStore>()(
	persist(
		set => ({
			favs: JSON.parse(localStorage.getItem('favs') || ''),
			setFav: (id: string) =>
				set((state: FavsStoreState) => {
					const isFavorite = state.favs.includes(id);
					const newFavs = isFavorite ? state.favs.filter(fav => fav !== id) : [...state.favs, id];

					return { favs: newFavs };
				}),
		}),
		{ name: 'favs' }
	)
);

export default useFavsStore;

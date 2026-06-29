import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause } from "lucide-react";

const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SongsPage = () => {
	const { songs, isLoading, fetchSongs } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

	useEffect(() => {
		fetchSongs();
	}, [fetchSongs]);

	const handlePlaySong = (index: number) => {
		if (songs.length > 0) {
			playAlbum(songs, index);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-full bg-zinc-900 text-zinc-400'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white' />
			</div>
		);
	}

	return (
		<div className='h-full bg-zinc-900 rounded-lg overflow-hidden flex flex-col'>
			<div className='p-6 border-b border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-900'>
				<h1 className='text-3xl font-bold text-white mb-2'>All Tracks</h1>
				<p className='text-sm text-zinc-400'>{songs.length} songs available</p>
			</div>

			<ScrollArea className='flex-1 p-6'>
				<div className='space-y-1'>
					{/* Table Header */}
					<div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-zinc-800 font-medium'>
						<div>#</div>
						<div>Title</div>
						<div>Artist</div>
						<div className='flex justify-end'><Clock className='h-4 w-4' /></div>
					</div>

					{/* Song List */}
					{songs.map((song, index) => {
						const isCurrentSong = currentSong?._id === song._id;
						return (
							<div
								key={song._id}
								className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-3 text-sm rounded-md items-center group hover:bg-white/10 transition-colors cursor-pointer
									${isCurrentSong ? "bg-white/5 text-emerald-400" : "text-zinc-300"}`}
								onClick={() => isCurrentSong ? togglePlay() : handlePlaySong(index)}
							>
								<div className='flex items-center justify-center relative size-4'>
									<span className='group-hover:hidden'>{index + 1}</span>
									<Button
										size='icon'
										variant='ghost'
										className='hidden group-hover:flex absolute inset-0 h-4 w-4 text-white hover:bg-transparent hover:scale-110 transition-transform'
									>
										{isCurrentSong && isPlaying ? (
											<Pause className='h-4 w-4 text-emerald-400' />
										) : (
											<Play className='h-4 w-4' />
										)}
									</Button>
								</div>

								<div className='flex items-center gap-3 min-w-0'>
									<img src={song.imageUrl} alt={song.title} className='size-10 object-cover rounded shadow' />
									<span className={`font-medium truncate ${isCurrentSong ? "text-emerald-400" : "text-white"}`}>
										{song.title}
									</span>
								</div>

								<div className='truncate text-zinc-400'>{song.artist}</div>
								<div className='flex justify-end text-zinc-400'>{formatDuration(song.duration)}</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default SongsPage;
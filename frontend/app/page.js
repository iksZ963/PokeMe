import ImageUpload from './components/ImageUpload';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Create Your Pokémon Character Card!</h1>
      <ImageUpload />
    </div>
  );
}

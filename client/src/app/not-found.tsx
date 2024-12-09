import Link from "next/link";

export async function generateMetadata({ locale }: { locale: string }) {
    return {
        title: "Page non trouvée - Panda Restaurant",
        description: "La page que vous recherchez n&apos;a pas été trouvée sur Le site Panda Restaurant."
    };
}

const NotFoundPage = () => {
    return (
        <main className="body-container h-screen flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-4xl font-bold">Désolé!!! Page non trouvée - 404</h1>
            <p className="mb-8 text-lg">La page que vous recherchez n&apos;existe pas.</p>
            <Link href="/" className="px-4 py-2 font-bold text-white btn btn-neutral">
                retour à l&apos;accueil
            </Link>
        </main>
    );
};

export default NotFoundPage;
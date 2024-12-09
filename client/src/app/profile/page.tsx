import Info from "@/components/profile/Info";
import { showMe } from "@/utils/apis/clients.api";
import { getAllOrders } from "@/utils/apis/orders.api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
export default async function Page() {

  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["user"],
  //   queryFn: showMe
  // });


  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen my-36 body-container">
        <Info />
      </main>
    </HydrationBoundary>
  )
}
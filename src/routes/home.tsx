import { Home } from "../features/app/components/home/home";
import { AppLayout } from "../features/app/layouts/app-layout";

export default function HomeRoute(){
    return (
        <AppLayout>
            <Home/>
        </AppLayout>
    )
}
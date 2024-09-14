import LeftNav from "../../components/LeftNavigation";

export default function Home() {

    return(
        <div>
            <div className="flex gap-3">
                <div className="w-[15%]">
                    <LeftNav />
                </div>
                <div>
                    HomePage
                </div>
                
            </div>
        </div>
    )
}
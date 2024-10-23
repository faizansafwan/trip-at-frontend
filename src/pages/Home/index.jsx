import NewPostModal from "../../components/PostModal";


export default function Home() {

    return(
        <div>
            <div className="mt-[80px] m-7 grid grid-cols-1 md:grid-cols-2 gap-3">
                
                <div className="">
                    {<NewPostModal />}
                </div>
                
            </div>
        </div>
    )
}
import React, {useState, useEffect} from 'react'
import Card from '../Card/Card'

function LatestBlog() {

    const [newBlog, setNewBlog] = useState([])
    const backend_url = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
      
      fetch(`${backend_url}/latestblog`)
      .then((response)=>response.json())
      .then((data)=>setNewBlog(data))

    }, [])
    

    return (
        <>
            <section className=" h-[100vh] py-16">
                <div className="container mx-auto">
                    <h3 className="text-3xl text-center font-bold text-[#111827] mb-8">Latest Blogs</h3>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Blog Card */}

                        { newBlog.map((item, i)=>{
                            return <Card key={i} title={item.title} description={item.description} image={item.image} id={item._id} />
                            })
                        }

                        
                        {/* Repeat Blog Cards */}
                    </div>


                </div>
            </section>
        </>
    )
}

export default LatestBlog
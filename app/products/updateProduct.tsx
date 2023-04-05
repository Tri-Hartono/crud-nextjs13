'use client';
import { SyntheticEvent, useState } from 'react';

//untuk melihat perubahan ketika di submit >>x
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  price: number;
};
export default function UpdateProduct(product: Product) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });
    setIsMutating(false);

    router.refresh();
    setModal(false);
  }
  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>
      <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg"> Edit Product {product.id}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-d">Title</label>
              <input type="text" className="input w-full input-bordered" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label font-d">Price</label>
              <input type="text" className="input w-full input-bordered" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="submit" className="btn loading">
                  Saving....
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

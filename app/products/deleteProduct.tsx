'use client';
import { useState } from 'react';

//untuk melihat perubahan ketika di submit >>x
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(productId: number) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: 'DELETE',
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
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>
      <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {product.title} ?</h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              close
            </button>
            {!isMutating ? (
              <button type="submit" onClick={() => handleDelete(product.id)} className="btn btn-primary">
                Delete
              </button>
            ) : (
              <button type="submit" className="btn loading">
                Deleting....
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

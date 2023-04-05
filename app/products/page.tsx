import AddProduct from './addProduct';
import DeleteProduct from './deleteProduct';

/////
type Product = {
  id: number;
  title: string;
  price: number;
};

async function getProducts() {
  const res = await fetch(
    'http://localhost:5000/products',
    //GetserversideProps in next 13 >>
    { cache: 'no-store' }
  );
  return res.json();
}
export default async function ProductList() {
  const products: Product[] = await getProducts();
  console.log(products);

  return (
    <>
      <div className="py-10 px-10 ">
        <div className="py-2">
          <AddProduct />
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <DeleteProduct {...product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

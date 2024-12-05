function Footer() {
  return (
      <div style={{bottom: 0}} className="bg-white p-8 mt-8 lg:mx-20 border-t border-t-gray-200">
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 gap-8">
              <div>
                  <h3 className="font-bold mb-2">VỀ CHÚNG TÔI</h3>
                  <ul>
                      <li className="mb-1">Giới thiệu</li>
                      <li className="mb-1">Tuyển dụng</li>
                      <li className="mb-1">Black Friday 2024</li>
                  </ul>
              </div>
              <div>
                  <h3 className="font-bold mb-2">CHÍNH SÁCH</h3>
                  <ul>
                      <li className="mb-1">Chính sách bảo hành</li>
                      <li className="mb-1">Chính sách giao hàng</li>
                      <li className="mb-1">Chính sách bảo mật</li>
                  </ul>
              </div>
              <div>
                  <h3 className="font-bold mb-2">THÔNG TIN</h3>
                  <ul>
                      <li className="mb-1">Hệ thống cửa hàng</li>
                      <li className="mb-1">Hướng dẫn mua hàng</li>
                      <li className="mb-1">Hướng dẫn thanh toán</li>
                      <li className="mb-1">Hướng dẫn trả góp</li>
                      <li className="mb-1">Tra cứu địa chỉ bảo hành</li>
                  </ul>
              </div>
              <div>
                  <h3 className="font-bold mb-2">TỔNG ĐÀI HỖ TRỢ</h3>
                  <ul>
                      <li className="mb-1">Mua hàng: <a href="tel:19005301" className="text-blue-500">1900.5301</a></li>
                      <li className="mb-1">Bảo hành: <a href="tel:19005325" className="text-blue-500">1900.5325</a></li>
                      <li className="mb-1">Khiếu nại: <a href="tel:18006173" className="text-blue-500">1800.6173</a></li>
                      <li className="mb-1">Email: <a href="mailto:cskh@gearvn.com" className="text-blue-500">cskh@gearvn.com</a></li>
                  </ul>
              </div>
              
          </div>
      </div>
  );
}
export default Footer;

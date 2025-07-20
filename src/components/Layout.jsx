import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import { Container, Row, Col } from "react-bootstrap";

export default function Layout() {
  return (
    <>
      <Header>
        <Searchbar />
      </Header>

      <Container fluid className="mt-4">
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
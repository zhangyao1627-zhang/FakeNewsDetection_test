import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'

function Footer(props) {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center"> Copyright &copy; FakeNewsDetection </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
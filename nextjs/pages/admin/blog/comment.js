import React, { Component, useState, useMemo } from 'react'
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { isLogin, isAdmin } from '../../../lib/utils';
import { ImageUrl } from '../../../lib/urls';
import Layout, { siteName, siteTitle } from '../../../components/layout';
import API from '../../../lib/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt, FaUpload } from 'react-icons/fa';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'react-loader';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Dialog from 'react-bootstrap-dialog';

var options = { lines: 13, length: 20, width: 10, radius: 30, scale: 0.35, corners: 1, color: '#fff', opacity: 0.25, rotate: 0, direction: 1, speed: 1, trail: 60, fps: 20, zIndex: 2e9, top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute' };

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Comment: [],
      url: ImageUrl(),
      loading: true
    }

  }

  componentDidMount = () => {
    API.GetComment().then(res => {
      if (res.status == true) {
        setTimeout(() => this.setState({
          Comment: res.data,
          loading: false
        }), 100);
        toast.dark(res.message);
      } else {
        setTimeout(() => this.setState({
          loading: false
        }), 100);
        toast.error(res.message);
      }
    }).catch(err => {
      console.log(err)
    })

  }

  render() {
    const columns = [
      {
        name: 'Nama',
        sortable: true,
        cell: row => <>{row.name} - {row.email}</>,
      },
      {
        name: 'Body',
        selector: row => row.body,
        sortable: true
      },
      {
        name: 'Aktif',
        sortable: true,
        cell: row => <>
          <Formik
            initialValues={{
              id: row.id,
              active: row.active,

            }}
            onSubmit={(values, actions) => {
              alert('Apakah anda yakin akan mengubah data ini?');
              //alert(JSON.stringify({
              //active: values.active,
              //}));
              API.PutComment({ id: values.id, active: values.active ? 'true' : '' }).then(res => {
                //console.log(res)
                if (res.status == true) {
                  toast.success(res.message);
                } else {
                  toast.error(res.message);
                }

              }).catch(err => {
                console.log(err)
              })

              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }}

          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              values,
              touched,
              errors,
              isSubmitting
            }) => (
              <Form onChange={handleSubmit}>
                <Form.Group>
                  <Form.Check type="switch" id={"custom-switch" + row.id} name="active" value={values.active} label="Aktifkan?" defaultChecked={row.active} onChange={handleChange} onBlur={handleBlur} checked={values.active} />
                </Form.Group>
                {/*<Form.Control as="select" name="active" onChange={handleChange} defaultValue={row.active} onBlur={handleBlur} size="sm">
                            <option value="1" >{isSubmitting ? 
                           "menunggu.." : "Active"}
                           </option>
                            <option value='0' >{isSubmitting ? 
                             "menunggu.." : "Not Active"}
                             </option>
 
                            </Form.Control>*/}

              </Form>
            )}
          </Formik>
        </>,
      }
    ];

    const customStyles = {
      rows: {
        style: {
          fontSize: '1rem',
        }
      },
      headCells: {
        style: {
          fontSize: '1rem',
        },
      },
      cells: {
        style: {
          fontSize: '1rem',
        },
      },
    };
    const TextField = styled.input`
      font-size: 14px;
      height: 34px;
      width: 250px;
      border-radius: 3px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #e5e5e5;
      padding: 0 32px 0 16px;
      &:hover {
        cursor: pointer;
      }
    `;
    const ClearButton = styled(Button)`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      height: 34px;
      width: 32px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const ExpandedStyle = styled.div`
      padding: 10px;
      display: block;
      width: 100%;

      p {
        font-size: 14px;
        font-weight: 400;
        word-break: break-all;
      }
    `;

    const ExpandedComponent = ({ data }) => (
      <ExpandedStyle>
        <p>
          Tanggal dibuat: {data.created_at ? data.created_at : '-'}<br />
          Tanggal diubah: {data.updated_at ? data.updated_at : '-'}<br />
        </p>
      </ExpandedStyle>
    );

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
        <TextField id="search" type="text" placeholder="Filter By Body" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton variant="secondary" type="button" onClick={onClear}>X</ClearButton>
      </>
    );

    const BasicTable = () => {
      const [filterText, setFilterText] = useState('');
      const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
      const filteredItems = this.state.Comment.filter(item => item.body && item.body.toLowerCase().includes(filterText.toLowerCase())
      );

      const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
      }, [filterText, resetPaginationToggle]);


      return (
        <DataTable
          //title="Semua Komentar"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          //selectableRows
          //selectableRowsHighlight
          persistTableHead
          expandableRows
          //expandOnRowClicked
          expandableRowsComponent={ExpandedComponent}
          customStyles={customStyles}
        />
      );
    };

    return (
      <Layout admin>
        <Head>
          <title>Komentar Blog - {siteTitle}</title>
        </Head>
        <Container fluid>
          <h3 className="mb-3">Komentar</h3>
          <Breadcrumb className="my-3">
            <Link href="/admin" passHref><Breadcrumb.Item>Dashboard</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>Komentar</Breadcrumb.Item>
          </Breadcrumb>
          <Card body>
            {this.state.loading ?
              <Loader options={options} className="spinner" />
              :
              <>
                <BasicTable />
                <Dialog ref={(component) => { this.dialog = component }} />
              </>
            }
          </Card>
        </Container>
      </Layout>
    )
  }
}

export default Comment;
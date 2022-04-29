import React, { Component, useState, useMemo } from 'react'
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { isLogin, isAdmin } from '../../../libs/utils';
import { ImageUrl } from '../../../libs/urls';
import Layout, { siteName, siteTitle } from '../../../components/layout';
import API from '../../../libs/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt, FaUpload, FaPlus } from 'react-icons/fa';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from 'react-loader';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Dialog from 'react-bootstrap-dialog';

var options = { lines: 13, length: 20, width: 10, radius: 30, scale: 0.35, corners: 1, color: '#fff', opacity: 0.25, rotate: 0, direction: 1, speed: 1, trail: 60, fps: 20, zIndex: 2e9, top: '50%', left: '50%', shadow: false, hwaccel: false, position: 'absolute' };
const validationSchema = yup.object({
  foto: yup.mixed().required()
});

class Service extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Service: [],
      url: ImageUrl(),
      loading: true
    }

  }

  componentDidMount = () => {
    API.GetService().then(res => {
      if (res.status == true) {
        setTimeout(() => this.setState({
          Service: res.data,
          loading: false
        }), 100);
        toast.dark(res.message);
      } else {
        this.setState({
          loading: false
        })
        toast.warn(res.message);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const columns = [
      {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        width: "10%"
      },
      {
        name: 'Gambar',
        sortable: true,
        width: "20%",
        cell: row => <>
          {row.image != null ?
            <img src={this.state.url + row.image} className="img-fluid p-2" width="150" alt={row.image} onClick={() => {
              this.dialog.show({
                title: 'Ganti Gambar',
                body: [<Formik key={row.id}
                  initialValues={{
                    id: row.id,
                    foto: row.image,
                  }}
                  onSubmit={(values, actions) => {
                    API.PutServiceImage(
                      {
                        id: values.id,
                        foto: values.foto.name
                      }
                    ).then(res => {
                      var data = res.data;
                      if (res.status == true) {
                        toast.success(res.message);
                        API.PostFoto(values.foto, values.foto.name).then(res => {
                          console.log('img_ok')
                          toast.success(res.message);
                          setTimeout(() => {
                            this.dialog.hide();
                            this.componentDidMount();
                          }, 3000);
                        })
                      } else {
                        this.errorKeys = Object.keys(data);
                        this.errorKeys.map((el) => {
                          this.setState({
                            [`${el}`]: data[el]
                          })
                        })
                        if (this.errorKeys.length > 0) {
                          setTimeout(() => this.errorKeys.map((el) => {
                            this.setState({
                              [`${el}`]: ""
                            })
                          }), 5000);
                        }
                        toast.error(res.message);
                      }
                    })

                    setTimeout(() => {
                      actions.setSubmitting(true);
                    }, 1000);
                  }}
                  validationSchema={validationSchema}
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
                    <Form onSubmit={handleSubmit}>

                      <Form.Group className="mb-3">
                        <Form.Label>Gambar</Form.Label><br />
                        <img src={this.state.url + row.image} className="img-fluid" width="400" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="foto">Upload Gambar</Form.Label>

                        <Form.Control type="file" className="mb-3" name="foto" id="foto" onChange={(event) => {
                          setFieldValue("foto", event.currentTarget.files[0]);
                          this.setState({
                            fotoPreviewUrl: URL.createObjectURL(event.currentTarget.files[0])
                          })
                        }
                        } onBlur={handleBlur} isInvalid={!!errors.foto && touched.foto} />
                        {errors.foto && touched.foto && <div className="error">{errors.foto}</div>}
                        {this.state.fotoPreviewUrl ? <img src={this.state.fotoPreviewUrl} width="200" alt="" className="mt-2 img-fluid" /> : ""}
                      </Form.Group>

                      <Button variant="primary" type="submit" disabled={isSubmitting}><FaUpload /> Upload</Button>

                    </Form>
                  )}
                </Formik>],
                bsSize: 'lg',
                actions: [
                  Dialog.CancelAction(() => {
                    console.log('Cancel was clicked!')
                  })
                ],
                onHide: (dialog) => {
                  dialog.hide()
                  console.log('closed by clicking background.')
                }
              })
            }} />
            :
            <img src={this.state.url + `/no-image.png`} className="img-fluid p-2" width="150" alt="no-image.png" onClick={() => {
              this.dialog.show({
                title: 'Ganti Gambar',
                body: [<Formik key={row.id}
                  initialValues={{
                    id: row.id,
                    foto: row.image,
                  }}
                  onSubmit={(values, actions) => {
                    API.PutServiceImage(
                      {
                        id: values.id,
                        foto: values.foto.name
                      }
                    ).then(res => {
                      var data = res.data;
                      if (res.status == true) {
                        toast.success(res.message);
                        API.PostFoto(values.foto, values.foto.name).then(res => {
                          console.log('img_ok')
                          toast.success(res.message);
                          setTimeout(() => {
                            this.dialog.hide();
                            this.componentDidMount();
                          }, 3000);
                        })
                      } else {
                        this.errorKeys = Object.keys(data);
                        this.errorKeys.map((el) => {
                          this.setState({
                            [`${el}`]: data[el]
                          })
                        })
                        if (this.errorKeys.length > 0) {
                          setTimeout(() => this.errorKeys.map((el) => {
                            this.setState({
                              [`${el}`]: ""
                            })
                          }), 5000);
                        }
                        toast.error(res.message);
                      }
                    })

                    setTimeout(() => {
                      actions.setSubmitting(true);
                    }, 1000);
                  }}
                  validationSchema={validationSchema}
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
                    <Form onSubmit={handleSubmit}>

                      <Form.Group className="mb-3">
                        <Form.Label>Gambar</Form.Label><br />
                        <img src={this.state.url+`/no-image.png`} className="img-fluid" width="400" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="foto">Upload Gambar</Form.Label>

                        <Form.Control type="file" className="mb-3" name="foto" id="foto" onChange={(event) => {
                          setFieldValue("foto", event.currentTarget.files[0]);
                          this.setState({
                            fotoPreviewUrl: URL.createObjectURL(event.currentTarget.files[0])
                          })
                        }
                        } onBlur={handleBlur} isInvalid={!!errors.foto && touched.foto} required="required" />
                        {errors.foto && touched.foto && <div className="error">{errors.foto}</div>}
                        {this.state.fotoPreviewUrl ? <img src={this.state.fotoPreviewUrl} width="200" alt="" className="mt-2 img-fluid" /> : ""}
                      </Form.Group>

                      <Button variant="primary" type="submit" disabled={isSubmitting}><FaUpload /> Upload</Button>

                    </Form>
                  )}
                </Formik>],
                bsSize: 'lg',
                actions: [
                  Dialog.CancelAction(() => {
                    console.log('Cancel was clicked!')
                  })
                ],
                onHide: (dialog) => {
                  dialog.hide()
                  console.log('closed by clicking background.')
                }
              })
            }} />
          }
        </>,
      },
      {
        name: 'Judul Layanan',
        selector: row => row.title,
        sortable: true,
        cell: row => <>
          {row.title}
        </>
      },
      {
        name: 'Aksi',
        sortable: false,
        cell: row => <><Link href={'/admin/service/edit/' + row.id} passHref><Button size="sm" title="Edit" alt="Edit"><FaPencilAlt /></Button></Link>&nbsp;
          <Button onClick={() => {
            this.dialog.show({
              title: 'Konfirmasi Hapus',
              body: 'Apakah anda yakin akan menghapus data ini?',
              bsSize: 'md',
              actions: [
                Dialog.CancelAction(() => {
                  console.log('Cancel was clicked!')
                }),
                Dialog.OKAction(() => {
                  API.DeleteService(row.id).then(res => {
                    if (res.status == true) {
                      toast.success(res.message);
                      setTimeout(() => {
                        this.componentDidMount();
                      }, 3000);
                    } else {
                      toast.error(res.message);
                    }
                  })
                })
              ],
              onHide: (dialog) => {
                dialog.hide()
                console.log('closed by clicking background.')
              }
            })
          }} variant="danger" size="sm" title="Hapus" alt="Hapus"><FaTrash /></Button></>,
      },
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
          Date Created: {data.created_at}<br />
          Date Updated: {data.updated_at}<br />
        </p>
      </ExpandedStyle>
    );

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
        <Link href="/admin/service/create" passHref><Button variant="primary" style={{ position: 'absolute', left: '0', marginLeft: '15px' }}><FaPlus /> Tambah</Button></Link>
        <TextField id="search" type="text" placeholder="Filter By Judul" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton variant="secondary" type="button" onClick={onClear}>X</ClearButton>
      </>
    );

    const BasicTable = () => {
      const [filterText, setFilterText] = useState('');
      const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
      const filteredItems = this.state.Service.filter(item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
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
          //title="Service"
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
          <title>Layanan - {siteTitle}</title>
        </Head>
        <Container fluid>
          <h3 className="mb-3">Layanan</h3>
          <Breadcrumb className="my-3">
            <Link href="/admin" passHref><Breadcrumb.Item>Dashboard</Breadcrumb.Item></Link>
            <Breadcrumb.Item active>Layanan</Breadcrumb.Item>
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



export default Service;
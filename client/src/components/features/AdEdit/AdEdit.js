import { Alert, Button, Form, Image, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, IMG_URL } from "../../../config";
import { fetchData, getAdById } from "../../../redux/adsRedux";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { useForm } from "react-hook-form";

const AdEdit = () => {

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));

  const {
    register, 
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ 
    mode: "onTouched",
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(">>", value, name, type);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!adData) {
      dispatch(fetchData());
    }
  }, [adData, dispatch]);

  const [title, setTitle] = useState(adData?.title || '');
  const [price, setPrice] = useState(adData?.price || '');
  const [localization, setLocalization] = useState(adData?.localization || '');
  const [phone, setPhone] = useState(adData?.phone || user.phone || '');
  const [content, setContent] = useState(adData?.content || '');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = () => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('photo', photo);
    fd.append('price', price);
    fd.append('localization', localization);
    fd.append('seller', user.login);
    fd.append('phone', phone);

    const options = {
      method: 'PUT',
      body: fd
    };

    setStatus('loading');
    fetch(`${API_URL}api/ads/${id}`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
        } else if (res.status === 401) {
          setStatus('adError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  };

  return (
    <section className="d-flex align-items-center justify-content-between">

      <div className="col-12 col-sm-5 ms-5">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <h1 className="my-5">Edit your ad!</h1>

          {status === "loading" && (
            <Spinner animation="border" role="status" className="block mx-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}

          {status === "success" && (
            <Alert variant="success">
              <Alert.Heading>Success!</Alert.Heading>
              <p>You have successfully edited your ad!</p>
              <CountdownTimer seconds={3} onComplete={() => navigate('/')} />
            </Alert>
          )}

          {status === "adError" && (
            <Alert variant="danger">
              <Alert.Heading>Cannot find ad</Alert.Heading>
              <p>The ad ID is incorrect</p>
            </Alert>
          )}

          {status === "serverError" && (
            <Alert variant="danger">
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p>An unexpected error occurred. Please try again!</p>
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              {...register('title', {
                required: true,
                minLength: 10,
                maxLength: 50,
              })}
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Enter title" 
            />
            {errors.title && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required and must be between 10 and 50 characters long.
              </small>
            )}
          </Form.Group>    

          <Form.Group className="mb-3" controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control 
              type="file" 
              onChange={e => setPhoto(e.target.files[0])} 
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <Form.Control 
                {...register('price', {
                  required: true,
                })}
                type="number" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                placeholder="Enter price" 
              />
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup>
            {errors.price && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group> 
          
          <Form.Group className="mb-3" controlId="formLocalization">
            <Form.Label>Localization</Form.Label>
            <Form.Control 
              {...register('localization', {
                required: true,
              })}
              type="text" 
              value={localization} 
              onChange={e => setLocalization(e.target.value)} 
              placeholder="Enter localization" 
            />
            {errors.localization && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group> 
                    
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
              {...register('phone', {
                required: true,
              })}
              type="tel" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              placeholder="Enter phone number" 
            />
            {errors.phone && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required.
              </small>
            )}
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control 
              {...register('content', {
                required: true,
                minLength: 20,
                maxLength: 1000,
              })}
              as="textarea" 
              rows="5" 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              placeholder="Enter content" 
            />
            {errors.content && (
              <small className='d-block form-text mt-2 p-2 bg-danger text-white rounded'>
                This field is required and must be between 20 and 1000 characters long.
              </small>
            )}
          </Form.Group> 

          <Button type="submit" variant="success" className="col-sm-6 py-2">
            Submit
          </Button>
          
        </Form>
      </div>

      <div className="col-12 col-sm-5 mt-5 justify-content-end">
        <div className="d-flex justify-content-center">
          <Image 
            src={IMG_URL + adData?.photo} 
            alt="Logo" 
            crossOrigin="anonymous" 
            className="img-fluid" 
            style={{ objectFit: "cover", height: "500px" }}
          />
        </div>
      </div>

    </section>
  );
};

export default AdEdit;

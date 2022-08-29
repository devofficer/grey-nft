import React, { useState } from 'react';

import ContainedButton from 'components/Buttons/ContainedButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { ChainId } from 'config/settings';
import { pinJSONToIPFS, pinFileToIPFS } from 'services/ipfs';
import { mintNFT } from 'utils/web3';

import { toast } from 'react-toastify';

const validationSchema = yup.object({
  name: yup
    .string('Enter name')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  description: yup
    .string('Enter description')
    .min(8, 'Description should be of minimum 8 characters length')
    .required('Description is required'),
  amount: yup
    .number('Enter amount')
    .min(1, 'Amount should be more than 0')
    .required('Amount is required'),
});

const VIDEO_OPTION = {
  HASH: 'HASH',
  UPLOAD: 'UPLOAD',
};

const Form = ({ signerAddress, setTrsHash, chainId }) => {
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoOption, setVideoOption] = useState(VIDEO_OPTION.UPLOAD);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      amount: 1,
      videoHash: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (ChainId !== chainId) {
        toast('Invalid Network!', { type: 'error' });
        return;
      }
      setIsLoading(true);
      try {
        let imgHash = values.videoHash;
        if (videoOption === VIDEO_OPTION.UPLOAD) {
          imgHash = await pinFileToIPFS(file);
          console.log('imgHash ==>', imgHash);
          if (!imgHash) {
            toast('Failed in uploading file to IPFS', { type: 'error' });
            return;
          }
          toast(
            <a href={`https://ipfs.io/ipfs/${imgHash}`} target='_blank' rel='noreferrer'>
              File uploaded to IPFS
            </a>,
            { type: 'success' },
          );
        }

        const metaData = {
          imageUrl: `https://ipfs.io/ipfs/${imgHash}`,
          name: values.name,
          description: values.description,
        };

        const json = {
          pinataMetadata: {
            name: `metadata-${values.name}`,
            keyvalues: {
              createdBy: signerAddress,
            },
          },
          pinataContent: metaData,
        };

        const metaDataHash = await pinJSONToIPFS(json);
        if (!metaDataHash) {
          toast('Failed in uploading json to IPFS', { type: 'error' });
          return;
        }
        toast(
          <a href={`https://ipfs.io/ipfs/${metaDataHash}`} target='_blank' rel='noreferrer'>
            JSON data uploaded to IPFS
          </a>,
          { type: 'success' },
        );
        console.log('metaDataHash ==>', metaDataHash);

        const transactionResult = await mintNFT({
          address: signerAddress,
          amount: values.amount,
          tokenURI: metaDataHash,
        });

        toast(
          <a
            href={`https://${ChainId === 4 ? 'rinkeby.' : ''}etherscan.io/tx/${
              transactionResult.transactionHash
            }`}
            target='_blank'
            rel='noreferrer'>
            Successfully minted! Check Transaction
          </a>,
          { type: 'success' },
        );
      } catch (error) {
        console.log(error);
        toast(error, { type: 'success' });
      }
      setIsLoading(false);
    },
  });

  // handle file upload
  const handleFile = e => {
    setFile(e.target.files[0]);
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = e => {
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRadioChange = event => {
    setVideoOption(event.target.value);
  };

  return (
    <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
      <Typography variant='h5' gutterBottom>
        Mint
      </Typography>
      <TextField
        name='name'
        label='Name'
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        variant='filled'
        margin='normal'
      />
      <TextField
        name='description'
        label='Description'
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        variant='filled'
        margin='normal'
      />
      <TextField
        name='amount'
        label='Amount'
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        value={formik.values.amount}
        onChange={formik.handleChange}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
        variant='filled'
        margin='normal'
      />
      <FormControl component='fieldset' margin='normal'>
        <FormLabel component='legend'> Upload Video | Input Hash Value</FormLabel>
        <RadioGroup row value={videoOption} onChange={handleRadioChange}>
          <FormControlLabel
            value={VIDEO_OPTION.UPLOAD}
            control={<Radio color='primary' />}
            label='Upload Video'
          />
          <FormControlLabel
            value={VIDEO_OPTION.HASH}
            control={<Radio color='primary' />}
            label='Input Hash Value'
          />
        </RadioGroup>
      </FormControl>

      <div className={classes.videoInput}>
        <input
          accept='video/mp4,image/*'
          id='upload-company-logo'
          onChange={handleFile}
          type='file'
          hidden
        />
        <label htmlFor='upload-company-logo' className={classes.label}>
          <div component='span' className={classes.videoAndImage}>
            <video
              src={imgSrc}
              width={160}
              height={160}
              className={classes.avatar}
              variant='rounded'
              poster={imgSrc}
            />
          </div>
        </label>
      </div>
      {file && <p>{file.name}</p>}

      <TextField
        name='videoHash'
        label='Video Hash'
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        disabled={videoOption !== VIDEO_OPTION.HASH}
        value={formik.values.videoHash}
        onChange={formik.handleChange}
        error={formik.touched.videoHash && Boolean(formik.errors.videoHash)}
        helperText={formik.touched.videoHash && formik.errors.videoHash}
        variant='filled'
        margin='normal'
      />

      <ContainedButton loading={isLoading} type='submit'>
        Submit
      </ContainedButton>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'block',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: 768,
    },
  },
  videoInput: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='gray' stroke-width='3' stroke-dasharray='12%2c 14' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e")`,
    padding: theme.spacing(1),
    '& > label': {
      cursor: 'pointer',
    },
  },
  label: {
    width: '100%',
  },
  videoAndImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Form;

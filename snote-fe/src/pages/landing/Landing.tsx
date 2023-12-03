import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, {FC, useEffect, useState} from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

import Image1 from '../../assets/images/app2.png';
import FeatureCover from '../../assets/images/feature-cover.webp';
import FeatureHeader from '../../assets/images/feature-header.png';
import QuizGame from '../../assets/images/quiz.png';
import SideBar from '../../assets/images/sidebar.png'
import TopHeader from "./TopHeader";
import Footer from "./Footer";

type IFront = {};
const Landing: FC<IFront> = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = 'initial'; // Reset to the initial overflow style
    };
  }, [])

  const featureList = ['Header', 'Cover', 'List', 'Code Block'];
  const accessList = [
    {
      image: FeatureHeader,
      label: 'Code Block',
      subLabel:
        'Snote allow you to write some code your note, it make easier to check',
    },
    {
      image: SideBar,
      label: 'Listing',
      subLabel:
        'Show all your document next to the sidebar. You can easily to find them by scrolling or searching.',
    },
    {
      image: FeatureHeader,
      label: 'Workspace',
      subLabel:
        'Separate your home note, work note or study note',
    },
    {
      image: FeatureHeader,
      label: 'Flexible',
      subLabel:
        'Help you create, organization your note with multiple block (heading, todo, number, order list, ...)',
    },
  ];
  const [featureSelected, setFeatureSelected] = useState(featureList[0]);

  const handleFeatureChange = (featureVal: string) => {
    setFeatureSelected(featureVal);
  };

  const Feature = styled('div')({
    background: 'url(../../assets/images/bg.jpg)',
    backgroundSize: 'cover',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.1,
  });

  const FeatureContainer = styled('div')({
    position: 'relative',
    marginTop: '60px',
    marginBottom: '60px',
    paddingTop: '40px',
    paddingBottom: '60px',
  });

  const MainContainer = styled('main')({
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '0 16px',
    paddingTop: '60px',
  })

  return (
    <>
      <TopHeader></TopHeader>
      <MainContainer>
        <Typography
          component="h2"
          sx={{ textShadow: '3px 3px #e3e3e3', fontSize: '2rem' }}
          className="text-center !font-bold tw-pt-[60px] tw-pb-3"
        >
          Stunning text editor for
          <span className="tw-text-primary"> student</span>
        </Typography>

        <Typography
          component="h2"
          className="!tw-text-md tw-max-w-[420px] !tw-mx-auto"
          sx={{ marginBottom: '2rem' }}
        >
          A beautiful app that allows you to create, edit, synchonize your techinal
          document. Even custom your own look
        </Typography>

        <Box component="img" className="tw-max-w-[80%] tw-mx-auto tw-block" src={Image1}></Box>

        <FeatureContainer>
          <Feature></Feature>
          <Typography
            component="h2"
            sx={{ textShadow: '3px 3px #e3e3e3', fontSize: '2rem', marginBottom: '20px' }}
            className="text-center !font-bold"
          >
            Simple, <span className="tw-ext-primary">yet</span> Powerful
          </Typography>

          {/*<Box component="div" className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mb-8">*/}
          {/*  {featureList.map((item) => (*/}
          {/*    <Button*/}
          {/*      variant={featureSelected === item ? 'contained' : 'outlined'}*/}
          {/*      size="small"*/}
          {/*      key={item}*/}
          {/*      onClick={() => handleFeatureChange(item)}*/}
          {/*    >*/}
          {/*      {item}*/}
          {/*    </Button>*/}
          {/*  ))}*/}
          {/*</Box>*/}

          <Box component="img" className="tw-max-w-[80%] tw-mx-auto tw-block" src={FeatureHeader}></Box>
        </FeatureContainer>

        <Box className="tw-mb-[80px]">
          <Typography
            component="h2"
            sx={{ fontSize: '2rem', marginBottom: '20px' }}
            className="tw-text-center !font-bold"
          >
            Accessibility
          </Typography>

          <Grid container spacing={2}>
            {accessList.map((item, index) => (
              <Grid item xs={8} sm={4} key={index}>
                <Card className="tw-h-[100%]">
                  <Box
                    component="div"
                    className="tw-mx-auto tw-mb-4 tw-bg-[#f3f3f3] tw-h-[240px]"
                  >
                    <Box component="img" className="tw-block tw-mb-8 tw-max-h-[100%] tw-mx-auto" src={item.image}></Box>
                  </Box>
                  <Box className="tw-px-3 tw-pb-2">
                    <Typography className="!font-bold">{item.label}</Typography>
                    <Typography
                      sx={{ color: '#6b7280', fontWeight: 400, fontSize: '0.8rem' }}
                    >
                      {item.subLabel}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box className="tw-mb-[80px] text-center">
          <Typography
            component="h2"
            sx={{ fontSize: '2rem', marginBottom: '14px' }}
            className="tw-text-center !font-bold"
          >
            Explore my quiz game
          </Typography>

          <Typography
            component="p"
            className="tw-text-center !tw-mb-8"
          >
            For more relax time, you can test your wits, learn something new, and enjoy an engaging experience with our interactive quiz game
          </Typography>

          <Box component="img" className="tw-max-w-[60%] tw-mx-auto tw-block tw-mb-8" src={QuizGame}></Box>

          <Button variant="contained" href="http://localhost:3030" target="_blank">
            Explore now
          </Button>
        </Box>

        <Divider></Divider>

        <Box>
          <Typography
            component="h2"
            sx={{ textShadow: '3px 3px #e3e3e3', fontSize: '2rem' }}
            className="tw-text-center !font-bold tw-pt-[40px] tw-pb-3"
          >
            <span className="tw-text-primary">Pricing </span> plans
          </Typography>

          <Typography
            component="h2"
            className="!tw-text-md tw-max-w-[420px] !tw-mx-auto"
            sx={{ marginBottom: '2rem' }}
          >
            Start taking note for free in 15 days, then add a plan to unlock additional
            features
          </Typography>

          <Box className="tw-flex tw-gap-10 tw-justify-center tw-mb-[40px]">
            <Card className="tw-w-[420px] tw-p-6 !tw-text-[black]">
              <Typography component="p" className="!tw-font-bold !tw-text-xl">
                Free Trial
              </Typography>
              <Typography component="p" className="!tw-py-4 !tw-text-gray">
                You can try it in 15-days for free.
              </Typography>
              <Typography component="p" sx={{ marginBottom: '20px' }}>
                <span className="tw-font-bold tw-text-5xl">$0</span> for 15 days
              </Typography>
              <Button variant="contained" sx={{ width: '100%' }}>
                Try now
              </Button>
              <Divider sx={{ marginBottom: '12px', marginTop: '28px' }}></Divider>
              <Typography component="p" sx={{ marginBottom: '8px' }}>
                What's included:
              </Typography>

              <div className="tw-flex tw-items-center tw-text-gray tw-text-[0.9rem] tw-py-[4px]">
                <AiOutlineCheck color="green" className="!tw-mr-1"></AiOutlineCheck>
                15 days usage without any fees
              </div>
              <div className="tw-flex tw-items-center tw-text-gray tw-text-[0.9rem] tw-py-[4px]">
                <AiOutlineCheck color="green" className="!tw-mr-1"></AiOutlineCheck>
                No setup fees
              </div>
              <div className="tw-flex tw-items-center tw-text-gray tw-text-[0.9rem] tw-py-[4px]">
                <AiOutlineCheck color="green" className="!tw-mr-1"></AiOutlineCheck>
                50 MB Storage
              </div>
            </Card>

            <Card className="tw-w-[420px] tw-p-6 !tw-text-[black]">
              <Typography component="p" className="!tw-font-bold !tw-text-xl">
                Pro Plan
              </Typography>
              <Typography component="p" className="!tw-py-4 !tw-text-gray">
                Or you can unlock the limited of free plan right now.
              </Typography>
              <Typography component="p" sx={{ marginBottom: '20px' }}>
                <span className="font-bold tw-text-5xl">$25</span> / year
              </Typography>
              <Button variant="contained" sx={{ width: '100%' }}>
                Buy Pro plan
              </Button>
              <Divider sx={{ marginBottom: '12px', marginTop: '28px' }}></Divider>
              <Typography component="p" sx={{ marginBottom: '8px' }}>
                What's included:
              </Typography>

              <div className="tw-flex tw-items-center tw-text-gray tw-text-[0.9rem] tw-py-[4px]">
                <AiOutlineCheck color="green" className="!mr-1"></AiOutlineCheck>
                Unlock all features
              </div>
              <div className="tw-flex tw-items-center tw-text-gray tw-text-[0.9rem] tw-py-[4px]">
                <AiOutlineCheck color="green" className="!mr-1"></AiOutlineCheck>
                Cloud synchronization
              </div>
              <div className="tw-flex tw-items-center tw-text-gray tw-text-[0.9rem] tw-py-[4px]">
                <AiOutlineCheck color="green" className="!mr-1"></AiOutlineCheck>2 GB
                Storage
              </div>
            </Card>
          </Box>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Landing;

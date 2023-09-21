import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBankAccount } from 'apiSdk/bank-accounts';
import { bankAccountValidationSchema } from 'validationSchema/bank-accounts';
import { BankAccountInterface } from 'interfaces/bank-account';

function BankAccountCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BankAccountInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBankAccount(values);
      resetForm();
      router.push('/bank-accounts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BankAccountInterface>({
    initialValues: {
      account_balance: 0,
      account_type: '',
      interest_rate: 0,
      account_number: '',
      account_status: '',
      account_owner: '',
    },
    validationSchema: bankAccountValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Bank Accounts',
              link: '/bank-accounts',
            },
            {
              label: 'Create Bank Account',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Bank Account
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Account Balance"
            formControlProps={{
              id: 'account_balance',
              isInvalid: !!formik.errors?.account_balance,
            }}
            name="account_balance"
            error={formik.errors?.account_balance}
            value={formik.values?.account_balance}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('account_balance', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.account_type}
            label={'Account Type'}
            props={{
              name: 'account_type',
              placeholder: 'Account Type',
              value: formik.values?.account_type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Interest Rate"
            formControlProps={{
              id: 'interest_rate',
              isInvalid: !!formik.errors?.interest_rate,
            }}
            name="interest_rate"
            error={formik.errors?.interest_rate}
            value={formik.values?.interest_rate}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('interest_rate', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.account_number}
            label={'Account Number'}
            props={{
              name: 'account_number',
              placeholder: 'Account Number',
              value: formik.values?.account_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.account_status}
            label={'Account Status'}
            props={{
              name: 'account_status',
              placeholder: 'Account Status',
              value: formik.values?.account_status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.account_owner}
            label={'Account Owner'}
            props={{
              name: 'account_owner',
              placeholder: 'Account Owner',
              value: formik.values?.account_owner,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/bank-accounts')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'bank_account',
    operation: AccessOperationEnum.CREATE,
  }),
)(BankAccountCreatePage);

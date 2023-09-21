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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getBankAccountById, updateBankAccountById } from 'apiSdk/bank-accounts';
import { bankAccountValidationSchema } from 'validationSchema/bank-accounts';
import { BankAccountInterface } from 'interfaces/bank-account';

function BankAccountEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BankAccountInterface>(
    () => (id ? `/bank-accounts/${id}` : null),
    () => getBankAccountById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BankAccountInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBankAccountById(id, values);
      mutate(updated);
      resetForm();
      router.push('/bank-accounts');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BankAccountInterface>({
    initialValues: data,
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
              label: 'Update Bank Account',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Bank Account
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(BankAccountEditPage);
